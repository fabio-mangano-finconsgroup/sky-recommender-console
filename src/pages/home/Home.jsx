import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Schedule from '../../components/schedule/Schedule';
import Fallback from '../../components/fallback/Fallback';
import Marginer from '../../components/marginer/Marginer';
import { TabIcon, Warning } from './Home.styled';
import useFallbackVodRec from '../../hooks/useFallbackVodRec';

/**
 * Component rendered when the user lands on the site homepage.
 */

const Home = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [alertFallback, setAlertFallback] = React.useState(0);
  const { data: fallbackVodRec } = useFallbackVodRec();

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleAlertFallback = (recFallback) => {
    //todo quando ci sarà il BE da rivedere
    let isExpiredFlag = 0;
    let rec = Array.isArray(recFallback)
      ? recFallback[0].items[0].recommendation
      : recFallback.items[0].recommendation;
    for (var i = 0; i < rec.length; i++) {
      if (rec[i].warningMessage !== '') {
        isExpiredFlag = 1;
      }
    }
    setAlertFallback(isExpiredFlag);
  };

  React.useEffect(() => {
    if (fallbackVodRec) {
      handleAlertFallback(fallbackVodRec);
    }
  }, [fallbackVodRec]);

  return (
    <>
      <Marginer direction="horizontal" margin={10} />
      <Tabs data-test="nav-tabs" value={selectedTab} onChange={handleChange}>
        <Tab label="Schedule" />
        {alertFallback === 0 && (
          <Tab data-test="fallback-nav-tab" label="Fallback" />
        )}
        {alertFallback === 1 && (
          <TabIcon
            data-test="fallback-nav-tab"
            icon={<Warning data-testid="warning-fallback" />}
            iconPosition="end"
            label="Fallback"
          />
        )}
      </Tabs>

      {selectedTab === 0 && <Schedule />}
      {selectedTab === 1 && (
        <Fallback handleAlertFallback={handleAlertFallback} />
      )}
    </>
  );
};
export default Home;
