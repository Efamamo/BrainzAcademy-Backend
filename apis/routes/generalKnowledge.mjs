import express from 'express'

export const generalKnowledgeRouter = express.Router()


generalKnowledgeRouter.get("/")
generalKnowledgeRouter.post("/")
generalKnowledgeRouter.get("/:id")
generalKnowledgeRouter.patch("/:id")
generalKnowledgeRouter.delete("/:id")