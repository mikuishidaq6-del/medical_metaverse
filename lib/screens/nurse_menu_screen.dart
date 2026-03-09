import 'package:flutter/material.dart';
import 'health_record_screen.dart';
import 'symptom_consultation_screen.dart';
import 'health_history_screen.dart';

class NurseMenuScreen extends StatelessWidget {
  final String diseaseType;

  const NurseMenuScreen({
    Key? key,
    required this.diseaseType,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('看護師メニュー'),
        centerTitle: true,
      ),
      body: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const SizedBox(height: 40),
            const Text(
              '今日はどうしますか？',
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 40),
            _MenuButton(
              icon: Icons.favorite,
              title: '体調を記録する',
              onPressed: () {
                Navigator.of(context).push(
                  MaterialPageRoute(
                    builder: (context) => const HealthRecordScreen(),
                  ),
                );
              },
            ),
            const SizedBox(height: 16),
            _MenuButton(
              icon: Icons.medical_services,
              title: '症状を相談する',
              onPressed: () {
                Navigator.of(context).push(
                  MaterialPageRoute(
                    builder: (context) => SymptomConsultationScreen(),
                  ),
                );
              },
            ),
            const SizedBox(height: 16),
            _MenuButton(
              icon: Icons.chat,
              title: '今日のことを話す',
              onPressed: () {
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('準備中です...')), 
                );
              },
            ),
            const SizedBox(height: 16),
            _MenuButton(
              icon: Icons.history,
              title: '記録を見る',
              onPressed: () {
                Navigator.of(context).push(
                  MaterialPageRoute(
                    builder: (context) => const HealthHistoryScreen(),
                  ),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}

class _MenuButton extends StatelessWidget {
  final IconData icon;
  final String title;
  final VoidCallback onPressed;

  const _MenuButton({
    required this.icon,
    required this.title,
    required this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    return ElevatedButton.icon(
      onPressed: onPressed,
      icon: Icon(icon, size: 28),
      label: Text(
        title,
        style: const TextStyle(fontSize: 18),
      ),
      style: ElevatedButton.styleFrom(
        padding: const EdgeInsets.symmetric(vertical: 20),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
      ),
    );
  }
}