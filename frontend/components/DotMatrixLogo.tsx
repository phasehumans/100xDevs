import React from 'react';

const CHARS: Record<string, string[]> = {
    P: ["1110", "1001", "1110", "1000", "1000"],
    H: ["1001", "1001", "1111", "1001", "1001"],
    A: ["0110", "1001", "1111", "1001", "1001"],
    S: ["0111", "1000", "0110", "0001", "1110"],
    E: ["1111", "1000", "1110", "1000", "1111"],
    U: ["1001", "1001", "1001", "1001", "0110"],
    M: ["10001", "11011", "10101", "10001", "10001"],
    N: ["10001", "11001", "10101", "10011", "10001"],
};

const WORD_1 = "PHASE";
const WORD_2 = "HUMANS";

export const DotMatrixLogo: React.FC<{ className?: string }> = ({ className = "h-8" }) => {
    // Construct the grid
    const buildGrid = (word: string) => {
        const rows: string[] = ["", "", "", "", ""];
        word.split('').forEach((char, i) => {
            const matrix = CHARS[char];
            if (matrix) {
                matrix.forEach((row, r) => {
                    rows[r] += row + (i < word.length - 1 ? "0" : ""); // 1px gap
                });
            }
        });
        return rows;
    };

    const grid1 = buildGrid(WORD_1);
    const grid2 = buildGrid(WORD_2);
    
    // Combine with spacing (3px space between words)
    const fullRows = grid1.map((row, i) => row + "000" + grid2[i]);
    
    const dots: React.ReactElement[] = [];
    let width = 0;
    
    fullRows.forEach((row, y) => {
        width = Math.max(width, row.length);
        row.split('').forEach((cell, x) => {
            if (cell === '1') {
                dots.push(
                    <circle key={`${x}-${y}`} cx={x + 0.5} cy={y + 0.5} r={0.35} fill="currentColor" />
                );
            }
        });
    });

    return (
        <svg 
            viewBox={`0 0 ${width} 5`} 
            className={className} 
            xmlns="http://www.w3.org/2000/svg"
            style={{ filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.4))' }}
        >
            {dots}
        </svg>
    );
};