import React, { useState, useCallback, useEffect } from "react";
import ReactFlow, {
  Node,
  Edge,
  Connection,
  addEdge,
  Background,
  Controls,
  MiniMap,
  applyNodeChanges,
  applyEdgeChanges,
  SmoothStepEdge,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";

import StartNode from "./StartNode";
import CategoryNode from "./CategoryNode";
import MealNode from "./MealNode";
import IngredientNode from "./IngredientNode";
import OptionNode from "./OptionNode";
import MealOptionNode from "./MealOptionNode";
import DetailsSidebar from "./DetailsSidebar";
import TagNode from "./TagNode";
import { useCategories } from "./hooks/useCategories";
import { useMeals } from "./hooks/useMeals";
import useMealDetails from "./hooks/useMealDetails";
import useMealsByIngredient from "./hooks/useMealsByIngredient";

const nodeTypes = {
  start: StartNode,
  category: CategoryNode,
  meal: MealNode,
  ingredient: IngredientNode,
  viewMealOption: OptionNode,
  tag: TagNode,
  option: MealOptionNode,
};

const edgeTypes = {
  custom: SmoothStepEdge, // Custom edge type for bezier style
};

const initialNodes: Node[] = [
  {
    id: "start",
    type: "start",
    data: { label: "Explore" },
    position: { x: 0, y: 0 },
  },
];

let nodeCounter = 0;

const App: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [expandedNodes, setExpandedNodes] = useState<string[]>([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [categoryId, setCategoryId] = useState<string>("");
  const [selectedMeal, setSelectedMeal] = useState<string | null>(null);
  const [selectedIngredient, setSelectedIngredient] = useState<string | null>(
    null
  );

  const { categories } = useCategories();
  const { meals, loading } = useMeals(categoryId);
  const { mealDetails, mealLoading } = useMealDetails(selectedMeal);
  const { ingredientMeals, ingredientMealLoading } =
    useMealsByIngredient(selectedIngredient);

  function extractNumber(str) {
    const match = str.match(/-(\d{5})-/);
    return match ? match[1] : null;
  }

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const onNodeClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      const isExpanded = expandedNodes.includes(node.id);
      const parentPosition = node.position;

const nodeOffsetX = 250; // Horizontal distance between parent and child nodes
const nodeOffsetY = 100; // Vertical distance between each child node

      

      if (node.type === "start") {
        if (isExpanded) {
          setExpandedNodes(expandedNodes.filter((id) => id !== node.id));
        } else {
          if(categories)
          {
            const topCategories = categories.slice(0, 5);
const halfLength = Math.floor(topCategories.length / 2);

const categoryNodes = topCategories.map((category, index) => {
  const isAbove = index < halfLength; // Check if the index is in the first half
  const yOffset = isAbove ? index * nodeOffsetY : (index - halfLength) * nodeOffsetY; // Calculate Y position based on the condition
  
  return {
    id: `${category.name}-${nodeCounter}`,
    type: "category",
    data: { label: category.name, thumbnail: category.thumbnail },
    position: {
      x: parentPosition.x + nodeOffsetX,
      y: parentPosition.y + yOffset + (isAbove ? -nodeOffsetY * halfLength : 0), // Adjust the initial position for the first half
    },
  };
});

            const categoryEdges = topCategories.map((category) => ({
              id: `start-${category.id}`,
              source: "start",
              target: `${category.name}-${nodeCounter}`,
              markerEnd: {
                type: MarkerType.ArrowClosed,
                color: 'black',
              }
            }));
  
            nodeCounter = nodeCounter + 1;
  
            setNodes((nds) => [...nds, ...categoryNodes]);
            setEdges((eds) => [...eds, ...categoryEdges]);
            setExpandedNodes([...expandedNodes, node.id]);
          }
          
        }
      } else if (node.type === "category") {
        if (isExpanded) {
          // Collapse logic
          setNodes((nodes) =>
            nodes.filter((n) => !n.id.startsWith(`option-${node.id}`))
          );
          setEdges((edges) => edges.filter((e) => e.source !== node.id));
          setExpandedNodes(expandedNodes.filter((id) => id !== node.id));
        } else {
          const categoryId = node.id.split("-")[0];
          setCategoryId(node.id.split("-")[0]); // Set the categoryId to trigger meal fetching

          const optionNode = {
            id: `option-${node.id}-${categoryId}-${nodeCounter}`,
            type: "viewMealOption",
            data: { label: "View Meals", categoryId: categoryId },
            position: {
              x: parentPosition.x + nodeOffsetX,
              y: parentPosition.y,
            },
          };
          const optionEdge = {
            id: `${node.id}-view-meals`,
            source: node.id,
            target: `option-${node.id}-${categoryId}-${nodeCounter}`,
            type: "custom",
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: "#007bff",
            },
          };

          nodeCounter = nodeCounter + 1;

          setNodes((nds) => [...nds, optionNode]);
          setEdges((eds) => [...eds, optionEdge]);
          setExpandedNodes([...expandedNodes, node.id]);
        }
      } else if (node.type === "viewMealOption") {
        console.log("node in viewMealOption -- ", node.data);

        console.log("Meal Loading -- ", mealLoading);
        console.log("Meals -- ", meals);

        if (node.data.categoryId) {
          // Category meals
          if (!loading && meals && meals.length > 0) {
            const topMeals = meals.slice(0, 5);
            const halfMealLength = Math.floor(topMeals.length / 2);
          
            const mealNodes = topMeals.map((meal, index) => {
              const isAbove = index < halfMealLength; // Check if the index is in the first half
              const yOffset = isAbove ? index * nodeOffsetY : (index - halfMealLength) * nodeOffsetY; // Calculate Y position based on the condition
          
              return {
                id: `meal-${meal.id}-${index}-${nodeCounter}`,
                type: "meal",
                data: {
                  label: meal.name,
                  mealId: meal.id,
                  thumbnail: meal.thumbnail,
                },
                position: {
                  x: parentPosition.x + nodeOffsetX,
                  y: parentPosition.y + yOffset + (isAbove ? -nodeOffsetY * halfMealLength : 0), // Adjust the initial position for the first half
                },
              };
            });
          
            const mealEdges = mealNodes.map((mealNode) => ({
              id: `edge-${node.id}-${mealNode.id}`,
              source: node.id,
              target: mealNode.id,
              markerEnd: {
                type: MarkerType.ArrowClosed,
                color: 'black',
              },
            }));
          
            nodeCounter += 1; // Increment node counter
          
            // Update state with the new nodes and edges
            setNodes((nds) => [...nds, ...mealNodes]);
            setEdges((eds) => [...eds, ...mealEdges]);
          }
          
        } else if (node.data.ingredient) {
          console.log("node.data.ingredient - ", node.data.ingredient);
          if (!ingredientMealLoading && ingredientMeals.length > 0) {
            console.log("ingredientMeals - ", ingredientMeals);
            
            const topIngredientMeals = ingredientMeals.slice(0, 5);
            const halfIngredientMealLength = Math.floor(topIngredientMeals.length / 2);
          
            const mealNodes = topIngredientMeals.map((meal, index) => {
              const isAbove = index < halfIngredientMealLength; // Check if the index is in the first half
              const yOffset = isAbove ? index * nodeOffsetY : (index - halfIngredientMealLength) * nodeOffsetY; // Calculate Y position based on the condition
          
              return {
                id: `ingredient-meal-${meal.id}-${index}-${nodeCounter}`,
                type: "meal",
                data: {
                  label: meal.name,
                  mealId: meal.id,
                  thumbnail: meal.thumbnail,
                },
                position: {
                  x: parentPosition.x + nodeOffsetX,
                  y: parentPosition.y + yOffset + (isAbove ? -nodeOffsetY * halfIngredientMealLength : 0), // Adjust the initial position for the first half
                },
              };
            });
          
            console.log(`mealNodes of ${node.data.ingredient} - `, mealNodes);
          
            const mealEdges = mealNodes.map((mealNode) => ({
              id: `edge-${node.id}-${mealNode.id}`,
              source: node.id,
              target: mealNode.id,
              markerEnd: {
                type: MarkerType.ArrowClosed,
                color: 'black',
              },
            }));
          
            nodeCounter += 1; // Increment node counter
          
            // Update state with the new nodes and edges
            setNodes((nds) => [...nds, ...mealNodes]);
            setEdges((eds) => [...eds, ...mealEdges]);
          }
          
        }
      } else if (node.type === "meal") {
        const mealId = extractNumber(node.id);
        setSelectedMeal(mealId);
        setShowSidebar(false);

        const topOptionNodes = [
          { id: `view-ingredients`, label: "View Ingredients" },
          { id: `view-tags`, label: "View Tags" },
          { id: `view-details`, label: "View Details" },
        ];
        
        const halfOptionLength = Math.floor(topOptionNodes.length / 2);
        
        const optionNodes = topOptionNodes.map((option, index) => {
          const isAbove = index < halfOptionLength; // Check if the index is in the first half
          const yOffset = isAbove ? index * nodeOffsetY : (index - halfOptionLength) * nodeOffsetY; // Calculate Y position based on the condition
        
          return {
            id: `${option.id}-${mealId}-${index}-${nodeCounter}`,
            type: "option",
            data: { label: option.label, mealId: mealId },
            position: {
              x: parentPosition.x + nodeOffsetX + nodeOffsetX,
              y: parentPosition.y + yOffset + (isAbove ? -nodeOffsetY * halfOptionLength : 0), // Adjust the initial position for the first half
            },
          };
        });
        
        const optionEdges = optionNodes.map((optionNode, index) => ({
          id: `edge-${node.id}-${optionNode.id}`,
          source: node.id,
          target: `${optionNode.id}`,
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: 'black',
          }
          
        }));

        nodeCounter = nodeCounter + 1;

        setNodes((nds) => [...nds, ...optionNodes]);
        setEdges((eds) => [...eds, ...optionEdges]);
      } else if (node.type === "option" && node.id.startsWith("view-details")) {
        setShowSidebar(prev => !prev);
      } else if (
        node.type === "option" &&
        node.id.startsWith("view-ingredients")
      ) {
        console.log("Node ID in option view ingredients:", node.id);
        const mealId = node.id.split("-")[2];

        if (mealDetails && !mealLoading) {
          const ingredients = mealDetails.ingredients || [];

          console.log("mealDetails - ", mealDetails);
          console.log("ingredients - ", ingredients);
          // Limit to the first 5 ingredients
          const topIngredientNodes = ingredients.slice(0, 5);
const halfIngredientLength = Math.floor(topIngredientNodes.length / 2);

const ingredientNodes = topIngredientNodes.map((ingredient, index) => {
  const isAbove = index < halfIngredientLength; // Check if the index is in the first half
  const yOffset = isAbove ? index * nodeOffsetY : (index - halfIngredientLength) * nodeOffsetY; // Calculate Y position based on the condition
  
  return {
    id: `ingredient-${ingredient.name}-${nodeCounter}`,
    type: "ingredient",
    data: { label: `${ingredient.name}` },
    position: {
      x: node.position.x + 400, // Keep the x position fixed as per your original logic
      y: node.position.y + yOffset + (isAbove ? -nodeOffsetY * halfIngredientLength : 0), // Adjust for the first half
    },
  };
});


          const ingredientEdges = ingredientNodes.map((ingredientNode) => ({
            id: `edge-${node.id}-${ingredientNode.id}`, // Unique edge ID
            source: node.id, // Source node ID
            target: ingredientNode.id, // Target ingredient node ID
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: 'black',
            }
          }));

          nodeCounter = nodeCounter + 1;

          setNodes((nds) => [...nds, ...ingredientNodes]);
          setEdges((eds) => [...eds, ...ingredientEdges]);
        } else {
          console.warn("Meal details not available to fetch ingredients.");
        }
      } else if (node.type === "option" && node.id.startsWith("view-tags")) {
        console.log("node.id in option view tags : ", node.id);
        const mealId = node.id.split("-")[2];
        const tags = mealDetails?.tags || [];

        const topTagNodes = tags.slice(0, 5); // Get the top 5 tags
const halfTagLength = Math.floor(topTagNodes.length / 2);

const tagNodes = topTagNodes.map((tag, index) => {
  const isAbove = index < halfTagLength; // Check if the index is in the first half
  const yOffset = isAbove ? index * nodeOffsetY : (index - halfTagLength) * nodeOffsetY; // Calculate Y position based on the condition

  return {
    id: `tag-${mealId}-${index}`,
    type: "tag",
    data: { label: tag },
    position: {
      x: parentPosition.x + nodeOffsetX + 400, // Keep the x position fixed as per your original logic
      y: parentPosition.y + yOffset + (isAbove ? -nodeOffsetY * halfTagLength : 0), // Adjust for the first half
    },
  };
});


        const tagEdges = tagNodes.map((tagNode) => ({
          id: `edge-${node.id}-${tagNode.id}`,
          source: node.id,
          target: tagNode.id,
        }));

        setNodes((nds) => [...nds, ...tagNodes]);
        setEdges((eds) => [...eds, ...tagEdges]);
      } else if (node.type === "ingredient") {
        console.log("node.id in ingredient : ", node.id);
        const ingredient = node.id.split("-")[1];
        setSelectedIngredient(ingredient);

        const optionNode = {
          id: `option-${ingredient}-view-meals-${nodeCounter}`,
          type: "viewMealOption",
          data: { label: "View Meals", ingredient: ingredient },
          position: {
            x: node.position.x + 200,
            y: node.position.y + 100,
          },
        };

        const optionEdge = {
          id: `ingredient-${ingredient}-view-meals-${nodeCounter}`,
          source: node.id,
          target: `option-${ingredient}-view-meals-${nodeCounter}`,
          type: 'custom',
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: '#007bff',
  },
        };

        nodeCounter = nodeCounter + 1;

        setNodes((nds) => [...nds, optionNode]);
        setEdges((eds) => [...eds, optionEdge]);
        setExpandedNodes([...expandedNodes, node.id]);
      }
    },
    [
      expandedNodes,
      nodes,
      edges,
      categories,
      loading,
      meals,
      mealDetails,
      mealLoading,
      ingredientMeals,
      ingredientMealLoading,
    ]
  );

  useEffect(() => {
    setSelectedMeal(null);
    setSelectedIngredient(null);
  }, [categoryId, selectedIngredient]);

  return (
    <div className="h-screen flex">
      <div className="flex-grow">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onConnect={onConnect}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
        >
          <Background variant="lines" />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
      {showSidebar && selectedMeal && mealDetails && (
  <DetailsSidebar meal={mealDetails} setShowSidebar={setShowSidebar} />
)}

    </div>
  );
};

export default App;
