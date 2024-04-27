export const analyzeNextSteps = (step, userResponse) => {
    return step === 0
        ? {
            purpose: "specify field",
            message: `Nice to meet you, ${userResponse}! What services do you need in the hospital today?`,
            options: ["Medicine", "Health Checkup", "Surgery"]
        }: {
            purpose: "bye",
            message: "Bye!"
        };
};
