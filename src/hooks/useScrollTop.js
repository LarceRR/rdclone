import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function useScrollTop(enabled = true) {
    const { pathname } = useLocation();

    useEffect(() => {
        if (enabled) {
            window.scrollTo(0, 0);
        }
    }, [pathname, enabled]);
}
