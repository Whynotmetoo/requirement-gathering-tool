"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface Question {
  id: number;
  type: string;
  question: string;
  options: string[];
}

export default function RequirementsForm() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});

  useEffect(() => {
    const savedQuestions = localStorage.getItem("formQuestions");
    if (savedQuestions) {
      setQuestions(JSON.parse(savedQuestions));
    }
  }, []);

  const handleAnswerChange = (questionId: number, value: string | string[]) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleCheckboxChange = (questionId: number, option: string, checked: boolean) => {
    const currentAnswers = (answers[questionId] as string[]) || [];
    let newAnswers: string[];
    
    if (checked) {
      newAnswers = [...currentAnswers, option];
    } else {
      newAnswers = currentAnswers.filter(item => item !== option);
    }
    
    handleAnswerChange(questionId, newAnswers);
  };

  const handleSubmit = () => {
    const savedResponses = localStorage.getItem("formResponses");
    const responses = savedResponses ? JSON.parse(savedResponses) : [];
    
    responses.push({
      id: Date.now(),
      timestamp: new Date().toISOString(),
      answers
    });
    
    localStorage.setItem("formResponses", JSON.stringify(responses));
    toast.success("Form submitted successfully!");
    setAnswers({});
  };

  const renderQuestion = (q: Question) => {
    switch (q.type) {
      case "text":
        return (
          <Textarea
            value={answers[q.id] as string || ""}
            onChange={(e) => handleAnswerChange(q.id, e.target.value)}
            placeholder="Enter your answer..."
          />
        );
      case "single":
        return (
          <RadioGroup
            value={answers[q.id] as string || ""}
            onValueChange={(value) => handleAnswerChange(q.id, value)}
          >
            {q.options.map((option, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`${q.id}-${idx}`} />
                <Label htmlFor={`${q.id}-${idx}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        );
      case "multiple":
        return (
          <div className="space-y-2">
            {q.options.map((option, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <Checkbox
                  id={`${q.id}-${idx}`}
                  checked={(answers[q.id] as string[] || []).includes(option)}
                  onCheckedChange={(checked) => 
                    handleCheckboxChange(q.id, option, checked as boolean)
                  }
                />
                <label
                  htmlFor={`${q.id}-${idx}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Requirements Gathering Form</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {questions.map((q) => (
              <div key={q.id} className="space-y-2">
                <Label>{q.question}</Label>
                {renderQuestion(q)}
              </div>
            ))}
            
            {questions.length > 0 && (
              <Button onClick={handleSubmit} className="w-full">
                Submit
              </Button>
            )}
            
            {questions.length === 0 && (
              <p className="text-center text-muted-foreground">
                No questions have been added to the form yet. Please use the Form Designer to create questions.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}