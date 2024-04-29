function BadRoutePage() {
    return (
        <div className="flex flex-col h-screen align-center text-center justify-center grow font-bold">
            <div>404 Error</div>
            <div>This Page Doesn't Exist</div>
            <div>This could also be because you are not authenticated, please route to the Welcome Page to refresh your credentials</div>
        </div>
    );
}
export default BadRoutePage;
