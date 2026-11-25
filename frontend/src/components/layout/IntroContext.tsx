import { createContext, useContext } from 'react';

export const IntroContext = createContext<{ done: boolean; setDone: () => void }>({ done: true, setDone: () => {} });
export const useIntro = () => useContext(IntroContext);
