import React from 'react';
import { TargetedJPGCompressor } from './shared/TargetedJPGCompressor';

export const CompressJPGTo50kb: React.FC = () => {
    return (
        <TargetedJPGCompressor 
            targetSizeKB={50} 
            toolName="Compress JPG to 50kb"
        />
    );
};
