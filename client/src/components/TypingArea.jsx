```
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RefreshCw, AlertCircle, Activity, Target, Zap } from 'lucide-react';
import Card from './ui/Card';
import { getAllMetrics, calculateAccuracy } from '../utils/typingMetrics';

const TypingArea = ({ words, duration, onComplete, isMultiplayer = false }) => {
    const [input, setInput] = useState('');
    const [timeLeft, setTimeLeft] = useState(duration);
    const [isActive, setIsActive] = useState(false);
    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [mistakes, setMistakes] = useState(0);
    
    const inputRef = useRef(null);
    const timerRef = useRef(null);
    const startTimeRef = useRef(null);
    const previousWPMRef = useRef(0);

    // Timer that runs continuously once started
    useEffect(() => {
        if (isActive && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        
        if (timeLeft === 0 && isActive) {
            clearInterval(timerRef.current);
            setIsActive(false);
            onComplete({ wpm, accuracy, mistakes });
        }
        
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [isActive, timeLeft, onComplete, wpm, accuracy, mistakes]);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    // Calculate stats using metrics module
    const calculateStats = useCallback(() => {
        if (!startTimeRef.current || !input.length) return;
        
        const elapsedMs = Date.now() - startTimeRef.current;
        const elapsedSeconds = elapsedMs / 1000; // Convert ms to seconds
        
        // Count correct chars and mistakes by comparing input to target
        let correctChars = 0;
        let errorCount = 0;
        for (let i = 0; i < input.length; i++) {
            if (input[i] === words[i]) {
                correctChars++;
            } else {
                errorCount++;
            }
        }
        
        const metrics = getAllMetrics({
            correctCharacters: correctChars,
            totalCharacters: input.length,
            mistakes: errorCount,
            elapsedSeconds: elapsedSeconds,
            previousWPM: previousWPMRef.current,
        });

        setWpm(metrics.wpm);
        setAccuracy(metrics.accuracy);
        setMistakes(errorCount);
        previousWPMRef.current = metrics.wpm;
    }, [input, words]);

    useEffect(() => {
        calculateStats();
    }, [input, calculateStats]);

    const handleChange = (e) => {
        const { value } = e.target;

        // Start timer on first keystroke
        if (!isActive && timeLeft === duration) {
            setIsActive(true);
            startTimeRef.current = Date.now(); // Record start time
        }

        setInput(value);

        // Check if test is complete (typed full text correctly)
        if (value.length >= words.length) {
            clearInterval(timerRef.current);
            setIsActive(false);
            
            // Calculate final WPM
            calculateStats();
            
            onComplete({
                wpm,
                accuracy,
                mistakes
            });
        }
    };

    const renderText = () => {
        return words.split('').map((char, index) => {
            let className = "text-3xl font-mono transition-all duration-75 ";
            if (index < input.length) {
                className += input[index] === char
                    ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                    : "text-error drop-shadow-[0_0_8px_rgba(244,63,94,0.4)]";
            } else if (index === input.length) {
                // Simple blinking vertical line cursor
                className += "text-gray-600 relative";
                return (
                    <span key={index} className={className}>
                        {char}
                        <span className="absolute -left-0.5 top-0 bottom-0 w-0.5 bg-primary animate-pulse"></span>
                    </span>
                );
            } else {
                className += "text-gray-600";
            }
            return <span key={index} className={className}>{char}</span>;
        });
    };

    return (
        <div className="w-full max-w-6xl mx-auto space-y-8" onClick={() => inputRef.current?.focus()}>
            {/* HUD Stats Bar */}
            <div className="grid grid-cols-3 gap-6">
                <Card className="flex items-center gap-4 !p-4">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary">
                        <Activity className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-white tabular-nums leading-none">{wpm}</div>
                        <div className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">WPM</div>
                    </div>
                </Card>

                <Card className="flex items-center justify-center !p-4 border-primary/30 bg-primary/5">
                    <div className="text-5xl font-bold text-white tabular-nums font-mono tracking-tight">
                        {timeLeft}<span className="text-lg text-primary ml-1">s</span>
                    </div>
                </Card>

                <Card className="flex items-center gap-4 !p-4 justify-end text-right">
                    <div>
                        <div className="text-3xl font-bold text-white tabular-nums leading-none">{accuracy}%</div>
                        <div className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">Accuracy</div>
                    </div>
                    <div className="p-3 rounded-xl bg-secondary/10 text-secondary">
                        <Target className="w-6 h-6" />
                    </div>
                </Card>
            </div>

            {/* Typing Area */}
            <div className="relative min-h-[300px] p-12 glass-panel rounded-3xl cursor-text group overflow-hidden">
                {/* Ambient Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-b from-primary/5 to-transparent opacity-50 pointer-events-none" />

                <div className="relative z-10 leading-relaxed break-words">
                    {renderText()}
                </div>

                <textarea
                    ref={inputRef}
                    value={input}
                    onChange={handleChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-default resize-none focus:outline-none z-20"
                    disabled={timeLeft === 0}
                    autoFocus
                    spellCheck="false"
                />
            </div>

            {/* Controls */}
            <div className="flex justify-center">
                <button
                    onClick={() => {
                        if (isMultiplayer) return;
                        window.location.reload();
                    }}
                    className={`
            group p - 4 rounded - full bg - surface border border - white / 10
hover: border - primary / 50 hover: bg - white / 5 hover: shadow - [0_0_20px_rgba(217, 70, 239, 0.2)]
transition - all duration - 300 
            ${ isMultiplayer ? 'hidden' : '' }
`}
                >
                    <RefreshCw className="w-6 h-6 text-gray-400 group-hover:text-primary group-hover:rotate-180 transition-all duration-500" />
                </button>
            </div>
        </div>
    );
};

export default TypingArea;
