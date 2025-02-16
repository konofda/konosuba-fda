import { create } from 'zustand';

interface Store {
  selectedCharacters: string[];
  setSelectedCharacters: (characters: string[]) => void;
  toggleCharacter: (baseId: string, isMultiSelect: boolean) => void;
}

export const useStore = create<Store>((set) => ({
  selectedCharacters: [],
  setSelectedCharacters: (characters) =>
    set({ selectedCharacters: characters }),
  toggleCharacter: (baseId, isMultiSelect) =>
    set((state) => {
      if (!isMultiSelect) {
        // If already selected, clear the selection
        if (
          state.selectedCharacters.length === 1 &&
          state.selectedCharacters[0] === baseId
        ) {
          return { selectedCharacters: [] };
        }
        return { selectedCharacters: [baseId] };
      }
      return {
        selectedCharacters: state.selectedCharacters.includes(baseId)
          ? state.selectedCharacters.filter((id) => id !== baseId)
          : [...state.selectedCharacters, baseId],
      };
    }),
}));
