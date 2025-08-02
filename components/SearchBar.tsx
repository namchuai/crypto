import React, { useCallback, useState } from 'react';
import { TextInput } from 'react-native';

type Props = {
  placeHolder?: string;
  onSearchTextUpdated: (text: string) => void;
};

const SearchBar: React.FC<Props> = ({ placeHolder, onSearchTextUpdated }) => {
  const [searchText, setSearchText] = useState('');

  const onChangeText = useCallback(
    (newText: string) => {
      setSearchText(newText);
      onSearchTextUpdated(newText);
    },
    [onSearchTextUpdated],
  );

  return (
    <TextInput
      value={searchText}
      onChangeText={onChangeText}
      placeholder={placeHolder}
    />
  );
};

export default SearchBar;
