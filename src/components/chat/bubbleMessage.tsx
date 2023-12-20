import { loremIpsum } from "lorem-ipsum";

interface Props {
    align: 'start' | 'end'
}

export const BubbleMessage = ({align}: Props) => {
    const bgColor = align === 'end' ? 'bg-violet-500' : 'bg-slate-100';
    const textColor = align === 'end' ? 'text-white' : 'text-slate-900';

    return (
        <div className={"flex flex-col w-full mb-5 items-" + align}>
            <div className={"w-1/6 min-w-1/6 max-w-1/2 p-3 "+ bgColor +" rounded-2xl"}>
                <p className={textColor}>{loremIpsum({
                    count: 1
                })}</p>
                <p className={"text-xs mt-2 float-end " + textColor}>
                    22/04/2023 13:04
                </p>
            </div>
        </div>
    )
}