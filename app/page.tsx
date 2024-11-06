"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";

type Question = {
  id: number;
  type: string;
  question: string;
  options: string[];
};

export default function FormDesigner() {
  const [questions, setQuestions] = useState<Question[]>([
    { id: 1, type: "text", question: "", options: [] }
  ]);

  const addQuestion = () => {
    const newId = questions.length + 1;
    setQuestions([...questions, { id: newId, type: "text", question: "", options: [] }]);
  };

  const removeQuestion = (id: number) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const updateQuestion = (id: number, field: string, value: any) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, [field]: value } : q
    ));
  };

  const addOption = (questionId: number) => {
    setQuestions(questions.map(q => 
      q.id === questionId 
        ? { ...q, options: [...q.options, ""] }
        : q
    ));
  };

  const updateOption = (questionId: number, optionIndex: number, value: string) => {
    setQuestions(questions.map(q => 
      q.id === questionId 
        ? { 
            ...q, 
            options: q.options.map((opt, idx) => 
              idx === optionIndex ? value : opt
            )
          }
        : q
    ));
  };

  const saveForm = () => {
    localStorage.setItem("formQuestions", JSON.stringify(questions));
    toast.success("Form saved successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Form Designer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {questions.map((q) => (
              <div key={q.id} className="p-4 border rounded-lg space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1 space-y-4">
                    <div className="space-y-2">
                      <Label>Question Type</Label>
                      <Select
                        value={q.type}
                        onValueChange={(value) => updateQuestion(q.id, "type", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="text">Text Response</SelectItem>
                          <SelectItem value="single">Single Choice</SelectItem>
                          <SelectItem value="multiple">Multiple Choice</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Question</Label>
                      <Textarea
                        value={q.question}
                        onChange={(e) => updateQuestion(q.id, "question", e.target.value)}
                        placeholder="Enter your question..."
                      />
                    </div>

                    {(q.type === "single" || q.type === "multiple") && (
                      <div className="space-y-2">
                        <Label>Options</Label>
                        {q.options.map((option, idx) => (
                          <Input
                            key={idx}
                            value={option}
                            onChange={(e) => updateOption(q.id, idx, e.target.value)}
                            placeholder={`Option ${idx + 1}`}
                            className="mb-2"
                          />
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => addOption(q.id)}
                        >
                          Add Option
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeQuestion(q.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            <div className="flex justify-between">
              <Button onClick={addQuestion}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Question
              </Button>
              <Button onClick={saveForm}>Save Form</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}