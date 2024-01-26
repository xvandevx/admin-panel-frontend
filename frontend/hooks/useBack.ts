import { useEffect } from 'react';
import init from "~/utils/authBack";

export const useBack = () => {

    useEffect(() => {
        if (typeof window !== "undefined" && typeof document !== "undefined") {
            const script = document.createElement('script');
            script.src = '/simplex-noise.min.js';
            script.async = true;
            document.body.appendChild(script);
            init();
        }
    });
}