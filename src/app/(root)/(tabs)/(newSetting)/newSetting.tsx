import { View } from 'react-native';
import { SafeAreaView } from '@/components/core/safe-area-view';
import { Text } from '@/components/core/text';
import { Toggle } from '@/components/core/toggle';
import { useColorScheme } from 'nativewind';
{
  /**This was an experimentation to see if everything words as intended */
}
export default function NewSettings() {
  const { colorScheme, setColorScheme } = useColorScheme();

  return (
    <SafeAreaView>
      <View className="flex flex-row items-center justify-between">
        <Text variant="title1">{`The color scheme is ${colorScheme}`}</Text>
        <Toggle
          value={colorScheme === 'dark'}
          onValueChange={() => setColorScheme(colorScheme === 'light' ? 'dark' : 'light')}
        />
      </View>
    </SafeAreaView>
  );
}
