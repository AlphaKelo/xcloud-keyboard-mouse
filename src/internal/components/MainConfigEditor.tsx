import React, { useCallback, useState } from 'react';
import { Spinner, SpinnerSize } from '@fluentui/react';
import { SerializedError } from '@reduxjs/toolkit';
import { GamepadConfig } from '../../shared/types';
import { DEFAULT_CONFIG_NAME } from '../../shared/gamepadConfig';
import GamepadConfigEditor from './GamepadConfigEditor';
import GamepadConfigSelector from './GamepadConfigSelector';
import { useAppDispatch } from './hooks/reduxHooks';
import { deleteGamepadConfigAction, modifyGamepadConfigAction, activateGamepadConfigAction } from '../state/actions';
import { PendingReadStatus } from '../state/reducers';
import ErrorDetails from './ErrorDetails';

interface MainConfigEditorProps {
  activeConfig: string | null;
  status: PendingReadStatus;
  error?: SerializedError;
  configs: Record<string, GamepadConfig>;
  initialConfig: string;
}

export default function MainConfigEditor({
  activeConfig,
  initialConfig,
  configs,
  status,
  error,
}: MainConfigEditorProps) {
  const dispatch = useAppDispatch();
  const [currentConfig, setCurrentConfig] = useState(initialConfig);

  const handleActivateGamepadConfig = useCallback(
    (name: string) => {
      dispatch(activateGamepadConfigAction({ name }));
    },
    [dispatch],
  );
  const handleSubmitGamepadConfig = useCallback(
    (name: string, gamepadConfig: GamepadConfig) => {
      dispatch(modifyGamepadConfigAction({ name, gamepadConfig }));
    },
    [dispatch],
  );
  const handleDeleteGamepadConfig = useCallback(
    (name: string) => {
      dispatch(deleteGamepadConfigAction({ name }));
      if (name === currentConfig) {
        setCurrentConfig(DEFAULT_CONFIG_NAME);
      }
    },
    [dispatch, currentConfig, setCurrentConfig],
  );
  const handleCancelCreate = useCallback(() => {
    setCurrentConfig(initialConfig);
  }, [initialConfig, setCurrentConfig]);
  const handleAddNewConfig = useCallback(
    (name: string) => {
      // Should this "draft" name be stored in a different state to be safe?
      setCurrentConfig(name);
    },
    [setCurrentConfig],
  );

  return (
    <div className="box margin-full vertical full-height">
      {status === 'failure' ? (
        <ErrorDetails error={error} />
      ) : status !== 'success' ? (
        <Spinner size={SpinnerSize.large} />
      ) : (
        <div className="vertical full-height">
          <GamepadConfigSelector
            className="padding-bottom-s"
            activeConfig={activeConfig}
            currentConfig={currentConfig}
            allConfigs={configs}
            setCurrentConfig={setCurrentConfig}
            addNewConfig={handleAddNewConfig}
          />
          <GamepadConfigEditor
            name={currentConfig}
            onActivate={handleActivateGamepadConfig}
            onDelete={handleDeleteGamepadConfig}
            onSubmitChanges={handleSubmitGamepadConfig}
            onCancelCreate={handleCancelCreate}
          />
        </div>
      )}
    </div>
  );
}
