"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  required?: boolean;
  category?: string;
}

// Add new mock data
const EMERGENCY_CONTACTS = [
  { title: "Emergency Room", phone: "1-800-123-4567" },
  { title: "24/7 Nurse Hotline", phone: "1-888-555-0123" }
];

const HELPFUL_LINKS = [
  { title: "Patient Portal", url: "#" },
  { title: "Insurance Information", url: "#" },
  { title: "Medical Records Request", url: "#" },
  { title: "Privacy Policy", url: "#" }
];

export default function MedicalAssessmentForm() {
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
    const unansweredRequired = questions
      .filter(q => q.required)
      .some(q => !answers[q.id] || 
        (Array.isArray(answers[q.id]) && (answers[q.id] as string[]).length === 0));

    if (unansweredRequired) {
      toast.error("Please complete all required fields");
      return;
    }

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
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Sidebar */}
        <div className="md:col-span-3">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900">Emergency Contacts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {EMERGENCY_CONTACTS.map((contact, index) => (
                  <div key={index} className="border-b pb-2 last:border-0">
                    <p className="text-sm font-medium text-gray-700">{contact.title}</p>
                    <a 
                      href={`tel:${contact.phone}`} 
                      className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {contact.phone}
                    </a>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Form */}
        <div className="md:col-span-6">
          <Card className="bg-white shadow-lg">
            <CardHeader className="border-b">
              <CardTitle className="text-2xl text-blue-900">Medical Assessment Form</CardTitle>
              <p className="text-gray-600 text-sm mt-2">
                Please complete all required fields marked with an asterisk (*)
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {questions.map((q) => (
                  <div key={q.id} className="space-y-3">
                    <Label className="text-gray-700 font-medium">
                      {q.question}
                      {q.required && <span className="text-red-500 ml-1">*</span>}
                      {q.type === 'multiple' && ' (Select all that apply)'}
                    </Label>
                    {renderQuestion(q)}
                  </div>
                ))}
                
                {questions.length > 0 && (
                  <Button 
                    onClick={handleSubmit} 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Submit Assessment
                  </Button>
                )}
                
                {questions.length === 0 && (
                  <p className="text-center text-gray-500">
                    No assessment questions are currently available. Please contact your healthcare administrator.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="md:col-span-3">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900">Patient Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {HELPFUL_LINKS.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    className="block text-sm text-blue-600 hover:text-blue-800 hover:underline py-1"
                  >
                    {link.title}
                  </a>
                ))}
                <div className="mt-6 pt-4 border-t">
                  <p className="text-sm text-gray-600 mb-2">Need Assistance?</p>
                  <a
                    href="mailto:support@hospital.com"
                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    support@hospital.com
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}