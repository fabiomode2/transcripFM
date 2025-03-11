import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";

import AntDesign from "@expo/vector-icons/AntDesign";

const icons = [
  "setting",
  "cloudo",
  "eyeo",
  "delete",
  "folder1",
  "file1",
  "addfolder",
  "folderopen",
  "search1",
  "calendar",
  "filetext",
  "sync",
  "reload1",
  "warning",
  "home",
  "menuunfold",
  "cloudupload",
];

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="archivo"
        options={{
          title: "Archivo",
          tabBarIcon: ({ color }) => (
            <AntDesign name="folder1" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="grabar"
        options={{
          title: "Añadir audio",
          tabBarIcon: ({ color }) => (
            <AntDesign name="plus" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
