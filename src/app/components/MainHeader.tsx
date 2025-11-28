import { tv } from "tailwind-variants";

const mainHeaderStyles = tv({
    slots: {
        container: "relative w-full md:w-max",
        header: "relative mt-2 z-[2] font-block text-white text-center",
        bgStripe: "absolute top-1/2 -translate-y-1/2 bg-primary z-[1] pointer-events-none left-1/2 -translate-x-1/2",
    },
    variants: {
        size: {
            small: {
                header: "text-[3rem] md:text-[4rem]",
                bgStripe: "h-[1.25rem] md:h-[1.75rem] w-[90%] md:w-full skew-x-[-16deg] md:scale-x-112 md:inset-x-0 md:left-auto md:translate-x-0",
            },
            medium: {
                header: "text-[4rem] md:text-[6rem]",
                bgStripe: "h-[2rem] md:h-[3rem] w-[90%] md:w-full skew-x-[-16deg] md:scale-x-112 md:inset-x-0 md:left-auto md:translate-x-0",
            },
            large: {
                header: "text-[6rem] md:text-[12rem]",
                bgStripe: "h-[3rem] md:h-[6rem] w-full skew-x-[-16deg] md:scale-x-112",
            },
        },
    },
    defaultVariants: {
        size: "large",
    },
});

interface MainHeaderProps {
    title: string;
    size?: "large" | "medium" | "small";
    bgColour?: string
}

const MainHeader = ({ title, bgColour = "bg-primary", size = "large" }: MainHeaderProps) => {
    const styles = mainHeaderStyles({ size });
    return (
        <div className={styles.container()}>
            <div className={`${styles.bgStripe()} ${bgColour}`} aria-hidden="true" />
            <h1 className={styles.header()}>{title}</h1>
        </div>
    );
};

export { MainHeader };