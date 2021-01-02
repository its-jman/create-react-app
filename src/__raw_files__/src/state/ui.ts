import { createContext } from "react";
import { action, computed, observable } from "mobx";

class UIStore {}

const uiStore = new UIStore();
export const UIContext = createContext(uiStore);
