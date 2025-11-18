import express from "express";
import dotenv from "dotenv";
import { TODO_ITEMS } from "./config.js";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors()); 

let todos = TODO_ITEMS;

app.get("/", (req, res) => {
    res.send("Todo API is running");
});

app.get("/todos", (req, res) => {
    res.json({
        success: true,
        data: todos,
        message: "Todo items fetched successfully"
    });
});

app.post("/todos", (req, res) => {
    
    const maxId = todos.length > 0 
        ? Math.max(...todos.map(t => parseInt(t.id))) 
        : 0;
    const newId = maxId + 1;

    const newItem = { 
        id: newId, 
        ...req.body,
    }; 
    
    todos.push(newItem);
    
    res.status(201).json({
        success: true,
        data: newItem,
        message: "Todo item added successfully"
    });
});

app.delete("/todos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = todos.length;
    
    todos = todos.filter(item => item.id !== id);
    
    if (todos.length < initialLength) {
        res.json({
            success: true,
            data: { id },
            message: "Todo item deleted successfully"
        });
    } else {
         res.status(404).json({
            success: false,
            message: "Todo item not found"
        });
    }
});

app.patch("/todos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const updates = req.body;
    let updatedItem = null;
    
    const todoIndex = todos.findIndex(item => item.id === id);

    if (todoIndex !== -1) {
        updatedItem = { ...todos[todoIndex], ...updates };
        todos[todoIndex] = updatedItem;

        res.json({
            success: true,
            data: updatedItem,
            message: "Todo item updated successfully"
        });
    } else {
        res.status(404).json({
            success: false,
            message: "Todo item not found"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

