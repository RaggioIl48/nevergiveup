import {
  createElement, Flame, Zap, Check, X, Lock, Volume2, Turtle, Mic, MicOff, Square, PenLine, Headphones, MessageCircle, Music,
  Trophy, User, Route, Dumbbell, RotateCcw, ChevronLeft, ChevronRight, Play, Star, Eraser, Download, Camera, LogOut, Target, Sparkles, AlertCircle, Info, BookOpen,
} from "lucide";

const set = { Flame, Zap, Check, X, Lock, Volume2, Turtle, Mic, MicOff, Square, PenLine, Headphones, MessageCircle, Music, Trophy, User, Route, Dumbbell, RotateCcw, ChevronLeft, ChevronRight, Play, Star, Eraser, Download, Camera, LogOut, Target, Sparkles, AlertCircle, Info, BookOpen };

export function icon(name, size = 24) {
  const svg = createElement(set[name], { width: size, height: size, "stroke-width": 2, "aria-hidden": "true", focusable: "false" });
  svg.setAttribute("width", size);
  svg.setAttribute("height", size);
  return svg;
}
