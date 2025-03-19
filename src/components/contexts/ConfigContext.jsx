import PropTypes from 'prop-types';
import { createContext } from 'react';

// project-imports
import config from '../config'; // ✅ Pastikan impor benar
import useLocalStorage from '../hooks/useLocalStorage';

// initial state
const initialState = {
  ...config,
  onChangeContainer: () => {},
  onChangeLocalization: () => {},
  onChangeMode: () => {},
  onChangePresetColor: () => {},
  onChangeDirection: () => {},
  onChangeMiniDrawer: () => {},
  onChangeMenuOrientation: () => {},
  onChangeMenuCaption: () => {},
  onChangeFontFamily: () => {},
  onChangeContrast: () => {}
};

// ==============================|| CONFIG CONTEXT & PROVIDER ||============================== //

const ConfigContext = createContext(initialState);

function ConfigProvider({ children }) {
  const [appConfig, setConfig] = useLocalStorage('able-pro-material-react-ts-config', initialState);

  const onChangeContainer = () => {
    setConfig({
      ...appConfig,
      container: !appConfig.container
    });
  };

  const onChangeLocalization = (lang) => {
    setConfig({
      ...appConfig,
      i18n: lang
    });
  };

  const onChangeMode = (mode) => {
    setConfig({
      ...appConfig,
      mode
    });
  };

  const onChangePresetColor = (theme) => {
    setConfig({
      ...appConfig,
      presetColor: theme
    });
  };

  const onChangeDirection = (direction) => {
    setConfig({
      ...appConfig,
      themeDirection: direction
    });
  };

  const onChangeMiniDrawer = (miniDrawer) => {
    setConfig({
      ...appConfig,
      miniDrawer
    });
  };

  const onChangeContrast = () => {
    setConfig({
      ...appConfig,
      themeContrast: !appConfig.themeContrast
    });
  };

  const onChangeMenuCaption = () => {
    setConfig({
      ...appConfig,
      menuCaption: !appConfig.menuCaption
    });
  };

  const onChangeMenuOrientation = (layout) => {
    setConfig({
      ...appConfig,
      menuOrientation: layout
    });
  };

  const onChangeFontFamily = (fontFamily) => {
    setConfig({
      ...appConfig,
      fontFamily
    });
  };

  return (
    <ConfigContext.Provider
      value={{
        ...appConfig,
        onChangeContainer,
        onChangeLocalization,
        onChangeMode,
        onChangePresetColor,
        onChangeDirection,
        onChangeMiniDrawer,
        onChangeMenuOrientation,
        onChangeMenuCaption,
        onChangeFontFamily,
        onChangeContrast
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
}

export { ConfigProvider, ConfigContext };

ConfigProvider.propTypes = { children: PropTypes.node };
