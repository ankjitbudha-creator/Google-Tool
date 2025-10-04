import React from 'react';
import { TargetedJPGCompressor } from './shared/TargetedJPGCompressor';

export const CompressJPGTo200kb: React.FC = () => {
    return (
        <TargetedJPGCompressor 
            targetSizeKB={200} 
            toolName="Compress JPG to 200kb"
        />
    );
};
