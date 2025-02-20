'use client';
import { useContext } from 'react';
import ScreenSizeContext from './ScreenSizeContext';

export default function useScreenSizeContext() {
	return useContext(ScreenSizeContext);
}
