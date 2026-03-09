import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class HealthRecordScreen extends StatefulWidget {
  const HealthRecordScreen({Key? key}) : super(key: key);

  @override
  State<HealthRecordScreen> createState() => _HealthRecordScreenState();
}

class _HealthRecordScreenState extends State<HealthRecordScreen> {
  String? _condition;
  String? _mood;
  final _memoController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('体調を記録する'),
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text(
              DateFormat('yyyy年MM月dd日').format(DateTime.now()),
              style: const TextStyle(fontSize: 16, color: Colors.grey),
            ),
            const SizedBox(height: 32),
            const Text(
              '体調',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 12),
            _ConditionRadio(
              value: '元気',
              groupValue: _condition,
              emoji: '😄',
              onChanged: (value) => setState(() => _condition = value),
            ),
            _ConditionRadio(
              value: 'ふつう',
              groupValue: _condition,
              emoji: '😐',
              onChanged: (value) => setState(() => _condition = value),
            ),
            _ConditionRadio(
              value: 'しんどい',
              groupValue: _condition,
              emoji: '😔',
              onChanged: (value) => setState(() => _condition = value),
            ),
            const SizedBox(height: 32),
            const Text(
              '気分',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 12),
            _ConditionRadio(
              value: '安心',
              groupValue: _mood,
              emoji: '😊',
              onChanged: (value) => setState(() => _mood = value),
            ),
            _ConditionRadio(
              value: '不安',
              groupValue: _mood,
              emoji: '😟',
              onChanged: (value) => setState(() => _mood = value),
            ),
            _ConditionRadio(
              value: '疲れ',
              groupValue: _mood,
              emoji: '😫',
              onChanged: (value) => setState(() => _mood = value),
            ),
            const SizedBox(height: 32),
            const Text(
              'メモ',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 12),
            TextField(
              controller: _memoController,
              maxLines: 5,
              decoration: InputDecoration(
                hintText: '自由に入力してください',
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(8),
                ),
              ),
            ),
            const SizedBox(height: 32),
            ElevatedButton(
              onPressed: () {
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(
                    content: Text('記録を保存しました'),
                    duration: Duration(seconds: 2),
                  ),
                );
                Navigator.pop(context);
              },
              style: ElevatedButton.styleFrom(
                padding: const EdgeInsets.symmetric(vertical: 16),
              ),
              child: const Text('保存する'),
            ),
          ],
        ),
      ),
    );
  }

  @override
  void dispose() {
    _memoController.dispose();
    super.dispose();
  }
}

class _ConditionRadio extends StatelessWidget {
  final String value;
  final String? groupValue;
  final String emoji;
  final Function(String?) onChanged;

  const _ConditionRadio({
    required this.value,
    required this.groupValue,
    required this.emoji,
    required this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      child: ListTile(
        leading: Text(emoji, style: const TextStyle(fontSize: 32)),
        title: Text(value),
        trailing: Radio(
          value: value,
          groupValue: groupValue,
          onChanged: onChanged,
        ),
        onTap: () => onChanged(value),
      ),
    );
  }
}