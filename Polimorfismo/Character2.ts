abstract class Character2 {
  abstract talk(): void;
  abstract specialMove(): void;

  static characterPresentation(character: Character2): void {
    character.talk();
    character.specialMove();
  }
}