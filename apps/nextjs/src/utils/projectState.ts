export default function getAllowedStates(currentState: string) {
    switch (currentState) {
      case "DRAFT":
        return ["EVALUATION"];
      case "EVALUTION":
        return ["ACCEPTED", "REJECTED", "APPROBATION"];
      case "INVALID":
        return ["REJECTED", "ADJUSTMENT"];
      default:
        return [];
    }
}
