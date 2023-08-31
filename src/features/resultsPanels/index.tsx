import { useState } from "react";
import Tab from "./Tab";
import TokensPanel from "./TokensPanel";
import TempPanel from "./TempPanel";

type TabName = 'tokens' | 'parser' | 'evaluate';
type Tab = {
    name: TabName;
    displayName: string;
};

interface Props {
    input: string;
}

export default function ResultsPanels({ input }: Props) {
    const [activeTab, setActiveTab] = useState<TabName>('tokens');

    const tabs: Tab[] = [
        { name: 'tokens', displayName: 'Tokens' },
        { name: 'parser', displayName: 'Parser' },
        { name: 'evaluate', displayName: 'Run Code'}
    ];

    const tabsStyles = {
        display: 'flex',
        height: '50px',
        backgroundColor: 'white',
        paddingLeft: '5px',
    };

    const DisplayPanel = () => activeTab === 'tokens'
        ? <TokensPanel input={input} />
        : <TempPanel />

    return (
        <div>
            <div style={tabsStyles}>
                {tabs.map(t => 
                    <Tab 
                        displayName={t.displayName} 
                        active={activeTab === t.name} 
                        handleClick={() => setActiveTab(t.name)}
                    />
                )}
            </div>

            <DisplayPanel />
        </div>
    );
}