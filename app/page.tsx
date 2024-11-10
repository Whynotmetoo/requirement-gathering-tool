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

import { Questions } from '../constants/Questions'

type Question = {
  id: number;
  type: string;
  question: string;
  options: string[];
};

// Add mock data for medical professionals
const DESIGN_RESOURCES = [
  { title: "Clinical Guidelines", url: "#", icon: "📋" },
  { title: "Question Templates", url: "#", icon: "📝" },
  { title: "Best Practices", url: "#", icon: "✨" },
  { title: "PHIPA Compliance Guide", url: "#", icon: "🔒" }
];

const QUICK_LINKS = [
  { title: "Medical Terminology Database", url: "#" },
  { title: "Standard Assessment Tools", url: "#" },
  { title: "Form Library", url: "#" },
  { title: "Department Templates", url: "#" }
];

// Add regulatory standards and guidelines
const REGULATORY_STANDARDS = [
  { 
    title: "PHIPA Privacy Rules",
    url: "#",
    icon: "🔒",
    description: "Latest privacy regulations and compliance requirements"
  },
  { 
    title: "HL7 Standards",
    url: "#",
    icon: "📊",
    description: "Health Level Seven International standards"
  },
  { 
    title: "HITECH Act",
    url: "#",
    icon: "📱",
    description: "Health Information Technology regulations"
  },
  { 
    title: "Joint Commission",
    url: "#",
    icon: "✓",
    description: "Healthcare accreditation standards"
  }
];

const CLINICAL_STANDARDS = [
  { 
    title: "ICD-11 Guidelines",
    url: "#",
    category: "Diagnosis Coding"
  },
  { 
    title: "SNOMED CT",
    url: "#",
    category: "Clinical Terminology"
  },
  { 
    title: "CPT Code Reference",
    url: "#",
    category: "Procedure Coding"
  },
  { 
    title: "NIH Guidelines",
    url: "#",
    category: "Research Standards"
  }
];

export default function FormDesigner() {
  const [questions, setQuestions] = useState<Question[]>(Questions);

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
    console.log(questions)
    toast.success("Form saved successfully!");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar */}
        <div className="lg:col-span-3">
          <Card className="bg-white shadow-sm mb-6">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900">Design Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {DESIGN_RESOURCES.map((resource, index) => (
                  <a
                    key={index}
                    href={resource.url}
                    className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <span>{resource.icon}</span>
                    <span className="text-sm text-gray-700 hover:text-blue-600">
                      {resource.title}
                    </span>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* New Regulatory Standards Card */}
          <Card className="bg-white shadow-sm mb-6">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900">Regulatory Standards</CardTitle>
              <p className="text-sm text-gray-600">Compliance & Guidelines</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {REGULATORY_STANDARDS.map((standard, index) => (
                  <div key={index} className="border-b last:border-0 pb-3">
                    <a
                      href={standard.url}
                      className="group"
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        <span>{standard.icon}</span>
                        <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">
                          {standard.title}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 ml-6">
                        {standard.description}
                      </p>
                    </a>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* New Clinical Standards Card */}
          <Card className="bg-white shadow-sm mb-6">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900">Clinical Standards</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {CLINICAL_STANDARDS.map((standard, index) => (
                  <div key={index} className="pb-2">
                    <p className="text-xs text-gray-500 mb-1">{standard.category}</p>
                    <a
                      href={standard.url}
                      className="text-sm text-gray-700 hover:text-blue-600 hover:underline"
                    >
                      {standard.title}
                    </a>
                  </div>
                ))}
                <div className="pt-3 border-t">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => window.open('#', '_blank')}
                  >
                    View All Standards
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Form Designer */}
        <div className="lg:col-span-6">
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

        {/* Right Sidebar */}
        <div className="lg:col-span-3">
          <Card className="bg-white shadow-sm mb-6">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900">Quick Links</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {QUICK_LINKS.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    className="block text-sm text-gray-700 hover:text-blue-600 hover:underline py-1"
                  >
                    {link.title}
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900">Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Technical Support</p>
                  <a
                    href="mailto:tech.support@hospital.com"
                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    tech.support@hospital.com
                  </a>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Clinical Support</p>
                  <a
                    href="tel:1-800-555-0199"
                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    1-800-555-0199
                  </a>
                </div>
                <div className="pt-4 border-t">
                  <Button 
                    variant="outline" 
                    className="w-full text-sm"
                    onClick={() => window.open('#', '_blank')}
                  >
                    View Documentation
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}