import React, { useState, useEffect, useRef } from "react";

interface Props {
    userResponse: string;
    botResponse: {
        purpose: string;
        message: string;
        options?: string[];
        sender: string;
    };
    sendUserResponse: string;
    optionClick: (ev: React.MouseEvent<HTMLElement>) => void;
}

interface DiagnosisInfo {
    purpose?: string;
    message: string;
    options?: string[];
    sender: string;
}

const Chats: React.FC<Props> = (props) => {
    const [messages, setMessages] = useState<DiagnosisInfo[]>([]);
    const dummyRef = useRef<HTMLDivElement>(null);
    const bodyRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messages.length === 0) {
            setMessages([
                {
                    purpose: "intro",
                    message:
                        "Hi there. You are now talking to a Diagnosis Bot that will help with picking the right medicine just for you! What is your name?",
                    sender: "bot",
                },
            ]);
        } else {
            const holder = [...messages];
            holder.push({
                message: props.sendUserResponse,
                sender: "patient",
            });
            setMessages(holder);

            setTimeout(() => {
                const holder2 = [...holder];
                holder2.push(props.botResponse);
                setMessages(holder2);
            }, 1000);
        }
    }, [props.sendUserResponse, props.botResponse, messages]);
};
