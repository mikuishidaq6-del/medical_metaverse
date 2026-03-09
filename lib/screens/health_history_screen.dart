import 'package:flutter/material.dart';

class HealthHistoryScreen extends StatefulWidget {
  const HealthHistoryScreen({Key? key}) : super(key: key);

  @override
  State<HealthHistoryScreen> createState() => _HealthHistoryScreenState();
}

class _HealthHistoryScreenState extends State<HealthHistoryScreen> {
  // サンプルデータ
  final List<Map<String, String>> healthRecords = [
    {'date': '5/1', 'condition': 'しんどい', 'mood': '不安'},
    {'date': '5/2', 'condition': 'ふつう', 'mood': '疲れ'},
    {'date': '5/3', 'condition': 'ふつう', 'mood': '安心'},
    {'date': '5/4', 'condition': '元気', 'mood': '安心'},
    {'date': '5/5', 'condition': '元気', 'mood': '安心'},
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('記録を見る'),
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const Text(
              '最近の体調',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 24),
            ...healthRecords.map((record) {
              return Card(
                margin: const EdgeInsets.only(bottom: 12),
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            record['date']!,
                            style: const TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          Text(
                            record['condition']!,
                            style: TextStyle(
                              fontSize: 16,
                              color: _getConditionColor(record['condition']!),
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 8),
                      Text(
                        '気分: ${record['mood']!}',
                        style: const TextStyle(color: Colors.grey),
                      ),
                    ],
                  ),
                ),
              );
            }).toList(),
            const SizedBox(height: 32),
            Card(
              color: Colors.blue[50],
              child: const Padding(
                padding: EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      '🤖 AI看護師のコメント',
                      style: TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.bold,
                        color: Colors.blue,
                      ),
                    ),
                    SizedBox(height: 8),
                    Text(
                      '最近体調が改善されているようですね。これまでの頑張りが報われています。
引き続き、無理のない範囲でお過ごしください。',
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Color _getConditionColor(String condition) {
    switch (condition) {
      case '元気':
        return Colors.green;
      case 'ふつう':
        return Colors.orange;
      case 'しんどい':
        return Colors.red;
      default:
        return Colors.grey;
    }
  }
}