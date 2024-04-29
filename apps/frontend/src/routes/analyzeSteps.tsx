export const analyzeNextSteps = (step: number, userResponse: string) => {
    return step === 0
        ? {
            purpose: "specify name",
            message: `Nice to meet you, ${userResponse}! What services do you need in the hospital today?`,
            options: ["Medicine", "Health Checkup", "Surgery"]
        }
        : {
        purpose: "bye",
            message: "Bye!"
    };
};
