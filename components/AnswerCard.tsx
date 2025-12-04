import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface AnswerCardProps {
  answer: string;
  location?: string;
}

export const AnswerCard: React.FC<AnswerCardProps> = ({ answer, location }) => {
  return (
    <div className="prose prose-slate max-w-none text-lg leading-relaxed text-slate-800">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ node, ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" />,
        }}
      >
        {answer}
      </ReactMarkdown>
    </div>
  );
};
