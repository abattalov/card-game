import React, { useEffect, useRef, useState } from 'react';
import '../styles/Card.css';
import type { Card } from '../types/types';

interface CardProps {
    card: Card;
}

export default function Card({ card }: CardProps) {   
    return (
        <img
            src={card.faceUp ? card.img : '/cards/card_back.png'}
            className="card"
        />
    );
}