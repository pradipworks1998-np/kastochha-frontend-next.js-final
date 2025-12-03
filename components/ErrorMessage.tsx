import React from 'react';
import { AlertCircle } from 'lucide-react';


interface ErrorMessageProps {
message: string;
}


const ErrorMessage = ({ message }: ErrorMessageProps) => {
if (!message) return null;


return (
<div className="mt-12 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center justify-center text-red-600 gap-2">
<AlertCircle size={20} />
<span>{message}</span>
</div>
);
};


export default ErrorMessage;