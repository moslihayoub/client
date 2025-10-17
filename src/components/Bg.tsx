import BgHomepage3 from "./BgHomepage3"

function Bg() {
    return (
        <div className="fixed inset-0 w-full h-full overflow-hidden">
            {/* Animated Gradient Background */}
            <div className="absolute inset-0">
                <BgHomepage3 />
            </div>
        </div>
    )
}

export default Bg