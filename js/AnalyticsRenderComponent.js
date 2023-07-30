import {
  View,
  Text,
} from "react-native";



export default function AnalyticsRenderComponent({ tasks, weeklyAnalytics, monthlyAnalytics, styles, deviceHeight }) {
  return (
    <View>
      {
        tasks && tasks.map((task, index) => {
          const weeklyTask = weeklyAnalytics.find(item => item.TaskName === task.TaskName) || null;
          const monthlyTask = monthlyAnalytics.find(item => item.TaskName === task.TaskName) || null;

          return (
            <View key={index} style={styles.normalSection}>
              <Text style={styles.analyticsTitle}>{task.TaskName}</Text>
              <View style={{ width: '50%', height: deviceHeight / 500, backgroundColor: '#b7b7b7', marginTop: deviceHeight / 90 }} />
              <View style={styles.semiTitleContainer}>
                <Text style={styles.semiAnalyticsTitle}>Past 4 weeks:</Text>
              </View>
              <View style={styles.statsContainer}>
                <View style={styles.fourStatsContainer}>
                  <Text style={styles.weekMonthText}>W1:</Text>
                  <Text style={styles.weekMonthStatsText}>{weeklyTask && weeklyTask.analytics.WeeklyTotal ? weeklyTask.analytics.WeeklyTotal : 'N/A'}</Text>
                </View>
              </View>s
              <View style={{ flexDirection: 'row', marginTop: deviceHeight / 30 }}>
                <Text style={styles.monthAvgTitle}>Monthly Average: </Text>
                <Text style={styles.monthAvgStat}>{monthlyTask && monthlyTask.analytics.MonthlyAverage ? monthlyTask.analytics.MonthlyAverage : 'N/A'}</Text>
              </View>
              <View style={{ width: '35%', height: deviceHeight / 500, backgroundColor: '#b7b7b7', marginTop: deviceHeight / 90 }} />
              <View style={styles.semiTitleContainer}>
                <Text style={styles.semiAnalyticsTitle}>Past 4 months:</Text>
              </View>
              <View style={styles.statsContainer}>
                {monthlyTask && monthlyTask.analytics.MonthlyData && monthlyTask.analytics.MonthlyData.map((monthData, idx) => (
                  <View key={idx} style={styles.fourStatsContainer}>
                    <Text style={styles.weekMonthText}>{`M${idx + 1}:`}</Text>
                    <Text style={styles.weekMonthStatsText}>{monthData ? monthData : 'N/A'}</Text>
                  </View>
                ))}
              </View>
            </View>
          );
        })
      }
    </View>
  );
}
