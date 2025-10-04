import React, { useState, useRef, useEffect, useCallback } from 'react';
import { DocumentDuplicateIcon, GlobeAltIcon, CodeBracketIcon, XSocialIcon, LinkedInIcon, PhotoIcon } from '../../components/Icons';

type SocialType = 'website' | 'github' | 'twitter' | 'linkedin';

const socialIcons: Record<SocialType, React.FC<any>> = {
    website: GlobeAltIcon,
    github: CodeBracketIcon,
    twitter: XSocialIcon,
    linkedin: LinkedInIcon,
};

function wrapText(context: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
    const words = text.split(' ');
    let line = '';
    let lineCount = 1;
    
    for (let n = 0; n < words.length; n++) {
      if (lineCount >= 4) { // Limit to 3 lines
          line += '...';
          break;
      }
      const testLine = line + words[n] + ' ';
      const metrics = context.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        context.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
        lineCount++;
      } else {
        line = testLine;
      }
    }
    context.fillText(line, x, y);
}


export const InfoCardMaker: React.FC = () => {
    const [name, setName] = useState('Babal Tools');
    const [title, setTitle] = useState('@babaltools');
    const [bio, setBio] = useState('A comprehensive collection of online tools designed for developers and everyday users.');
    const [profilePic, setProfilePic] = useState<string | null>(null);
    const [bgColor, setBgColor] = useState('#1e293b');
    const [textColor, setTextColor] = useState('#cbd5e1');
    const [accentColor, setAccentColor] = useState('#fbbf24');
    const [font, setFont] = useState('Inter');
    const [socials, setSocials] = useState([
        { type: 'website' as SocialType, value: 'babal.tools' },
        { type: 'github' as SocialType, value: 'babal-tools' }
    ]);

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const drawCard = useCallback(async (canvas: HTMLCanvasElement, scale = 1) => {
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const w = 600 * scale;
        const h = 300 * scale;
        canvas.width = w;
        canvas.height = h;

        // Background
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, w, h);

        // Profile Picture
        const picSize = 100 * scale;
        const picX = 60 * scale;
        const picY = 60 * scale;
        ctx.save();
        ctx.beginPath();
        ctx.arc(picX + picSize / 2, picY + picSize / 2, picSize / 2, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        if (profilePic) {
            const img = new Image();
            img.src = profilePic;
            await new Promise(resolve => { img.onload = resolve; });
            ctx.drawImage(img, picX, picY, picSize, picSize);
        } else {
            ctx.fillStyle = '#475569';
            ctx.fillRect(picX, picY, picSize, picSize);
            ctx.fillStyle = 'white';
            ctx.font = `${18 * scale}px ${font}`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('Upload Photo', picX + picSize / 2, picY + picSize / 2);
        }
        ctx.restore();
        
        // Text
        const textX = 180 * scale;
        ctx.fillStyle = accentColor;
        ctx.font = `bold ${32 * scale}px ${font}`;
        ctx.fillText(name, textX, 85 * scale);

        ctx.fillStyle = textColor;
        ctx.font = `${18 * scale}px ${font}`;
        ctx.fillText(title, textX, 120 * scale);

        ctx.font = `normal ${16 * scale}px ${font}`;
        wrapText(ctx, bio, textX, 155 * scale, 380 * scale, 22 * scale);

        // Socials
        let socialY = h - 60 * scale;
        socials.forEach((social, i) => {
            if (!social.value) return;
            const Icon = socialIcons[social.type];
            // Since we can't directly render React components on canvas, we just show text.
            // A more complex implementation would convert SVG to image data.
            ctx.fillStyle = accentColor;
            ctx.font = `bold ${14 * scale}px ${font}`;
            ctx.fillText(social.type.toUpperCase(), 60 * scale + i * 140 * scale, socialY);
            
            ctx.fillStyle = textColor;
            ctx.font = `normal ${14 * scale}px ${font}`;
            ctx.fillText(social.value, 60 * scale + i * 140 * scale, socialY + 20 * scale);
        });

    }, [name, title, bio, profilePic, bgColor, textColor, accentColor, font, socials]);
    
    useEffect(() => {
        if(canvasRef.current) {
            drawCard(canvasRef.current);
        }
    }, [drawCard]);

    const handleProfilePicUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => setProfilePic(event.target.result as string);
            reader.readAsDataURL(e.target.files[0]);
        }
    };
    
    const handleDownload = async () => {
        const tempCanvas = document.createElement('canvas');
        await drawCard(tempCanvas, 2); // Draw at 2x resolution
        const link = document.createElement('a');
        link.download = 'infocard.png';
        link.href = tempCanvas.toDataURL('image/png');
        link.click();
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
                <div className="p-4 border rounded-lg dark:border-slate-700">
                    <label className="block text-sm font-semibold mb-2">Profile Picture</label>
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
                           {profilePic ? <img src={profilePic} className="w-full h-full object-cover"/> : <PhotoIcon className="w-8 h-8 text-slate-400"/>}
                        </div>
                        <input type="file" accept="image/*" onChange={handleProfilePicUpload} className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-primary hover:file:bg-indigo-100" />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Input label="Name" value={name} onChange={e => setName(e.target.value)} />
                    <Input label="Title / Handle" value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div>
                     <label className="block text-sm font-semibold mb-1">Bio</label>
                    <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3} className="w-full p-2 border rounded-md bg-transparent dark:border-slate-600" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <ColorInput label="Background" value={bgColor} onChange={e => setBgColor(e.target.value)} />
                    <ColorInput label="Text" value={textColor} onChange={e => setTextColor(e.target.value)} />
                    <ColorInput label="Accent" value={accentColor} onChange={e => setAccentColor(e.target.value)} />
                </div>
                 <div>
                    <label className="block text-sm font-semibold mb-1">Font</label>
                    <select value={font} onChange={e => setFont(e.target.value)} className="w-full p-2 border rounded-md bg-transparent dark:border-slate-600">
                        <option>Inter</option>
                        <option>Roboto</option>
                        <option>Montserrat</option>
                        <option>Poppins</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-semibold">Socials</label>
                    {socials.map((social, i) => (
                        <div key={i} className="flex items-center gap-2">
                             <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                                {React.createElement(socialIcons[social.type], {className: "w-5 h-5 text-slate-500"})}
                            </div>
                            <input value={social.value} onChange={e => {
                                const newSocials = [...socials];
                                newSocials[i].value = e.target.value;
                                setSocials(newSocials);
                            }} className="w-full p-2 border rounded-md bg-transparent dark:border-slate-600" />
                        </div>
                    ))}
                </div>

                <button onClick={handleDownload} className="w-full flex items-center justify-center gap-2 mt-4 p-3 bg-primary text-white font-bold rounded-md hover:bg-primary-hover transition">
                    <DocumentDuplicateIcon className="w-5 h-5"/>
                    Download InfoCard
                </button>
            </div>
            <div>
                <canvas ref={canvasRef} className="w-full rounded-lg shadow-lg border dark:border-slate-700" style={{aspectRatio: '2 / 1'}} />
            </div>
        </div>
    );
};

const Input: React.FC<{label: string, value: string, onChange: React.ChangeEventHandler<HTMLInputElement>}> = ({label, value, onChange}) => (
    <div>
        <label className="block text-sm font-semibold mb-1">{label}</label>
        <input value={value} onChange={onChange} className="w-full p-2 border rounded-md bg-transparent dark:border-slate-600" />
    </div>
);

const ColorInput: React.FC<{label: string, value: string, onChange: React.ChangeEventHandler<HTMLInputElement>}> = ({label, value, onChange}) => (
    <div>
        <label className="block text-sm font-semibold mb-1">{label}</label>
        <div className="flex items-center gap-2 p-1 border rounded-md dark:border-slate-600">
            <input type="color" value={value} onChange={onChange} className="w-8 h-8 p-0 border-none rounded cursor-pointer bg-transparent" />
            <input value={value} onChange={onChange} className="w-full p-1 bg-transparent border-none focus:ring-0 text-sm"/>
        </div>
    </div>
);
