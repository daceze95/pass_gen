import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Image, Platform, TouchableOpacity } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { PasswordContext } from "@/Context";

interface HistoryProps {
  id: number;
  masked: string;
  unMasked: string;
  description: string;
  activeDays: string;
}

export default function TabTwoScreen() {
  const { masked, unMasked, description, copyToClipboard } =
    useContext(PasswordContext);
  const [history, setHistory] = useState<HistoryProps[]>([]);

  useEffect(() => {
    if (masked && unMasked && description) {
      setHistory((prevHistory) => {
        const key = `${masked}-${unMasked}-${description}`
        const exists = prevHistory.some(
          (entry) =>
            `${entry.masked}-${entry.unMasked}-${entry.description}` === key
        );

        if (exists) return prevHistory;

        const newHistory = {
          id: Date.now(),
          masked,
          unMasked,
          description,
          activeDays: new Date().getUTCDate().toString(),
        };

        return [newHistory, ...prevHistory];
      });
    }
    // console.log(history)
  }, [masked, unMasked, description]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">History</ThemedText>
      </ThemedView>

      {masked && description ? (
        <ThemedView>
          <ThemedView style={styles.tableContainer}>
            {/* Table Header */}
            <ThemedView style={[styles.row, styles.header]}>
              <ThemedText style={styles.headerText}>Masked Password</ThemedText>
              <ThemedText style={styles.headerText}>Description</ThemedText>
              <ThemedText style={styles.headerText}>Active Days</ThemedText>
            </ThemedView>

            {/* Table Rows */}
            {history.map((hist) => (
              <TouchableOpacity
                key={hist.id}
                onPress={() => copyToClipboard(hist.unMasked)}
              >
                <ThemedView style={styles.row}>
                  <ThemedText style={styles.cell}>
                    {hist.id}
                    {hist.masked}
                  </ThemedText>
                  <ThemedText style={styles.cell}>
                    {hist.description}
                  </ThemedText>
                  <ThemedText style={styles.cell}>{hist.activeDays}</ThemedText>
                </ThemedView>
              </TouchableOpacity>
            ))}
          </ThemedView>
        </ThemedView>
      ) : (
        <ThemedView>
          <ThemedText>Your history is empty...</ThemedText>
        </ThemedView>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  header: {
    backgroundColor: "#3498db",
  },
  headerText: {
    fontWeight: "bold",
    color: "white",
    flex: 1,
    textAlign: "center",
  },
  cell: {
    flex: 1,
    textAlign: "center",
  },
});
