"use client";

import React from 'react';
import { TargetedJPGCompressor } from './shared/TargetedJPGCompressor';

export const CompressJPGTo100kb: React.FC = () => {
    return (
        <TargetedJPGCompressor 
            targetSizeKB={100} 
            toolName="Compress JPG to 100kb"
        />
    );
};
