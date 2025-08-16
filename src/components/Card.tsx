import React, { useEffect, useRef, useState } from 'react';
import '../styles/Card.css';
import type { Card } from '../types/Card';

interface CardProps {
    card: Card;
}

export default function Card({ card }: CardProps) {

    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });

    const offsetRef = useRef<{ x: number, y: number }>({ x: 0, y: 0 })

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            if (!isDragging) return;

            const newPosition = {
                x: e.clientX - offsetRef.current.x,
                y: e.clientY - offsetRef.current.y
            };

            setPosition(newPosition)
        };

        const onMouseUp = (e: MouseEvent) => {
            setIsDragging(false);
        };

        if(isDragging){
            document.addEventListener('mouseup', onMouseUp);
            document.addEventListener('mousemove', onMouseMove);
        }

        return () => {
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mousemove', onMouseMove);
        }

    }, [isDragging])

    const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsDragging(true);
        const cardElement = e.currentTarget;
        const offset = {
            x: e.clientX - cardElement.getBoundingClientRect().left,
            y: e.clientY - cardElement.getBoundingClientRect().top
        };

        offsetRef.current = offset;
    };

    return (
        <div
            className="card"
            onMouseDown={onMouseDown}
            style={{ transform: `translate(${position.x}px, ${position.y}px)` }}>
            <p>{card.rank} - {card.suit}</p>
        </div>
    );
}