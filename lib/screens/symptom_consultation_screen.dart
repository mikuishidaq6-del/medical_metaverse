import 'package:flutter/material.dart';

class SymptomConsultationScreen extends StatelessWidget {
  const SymptomConsultationScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Symptom Consultation'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: <Widget>[
            const TextField(
              decoration: InputDecoration(labelText: 'Enter your symptoms'),
              maxLines: 3,
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                // Logic for symptom analysis and danger detection goes here
                // For example purposes, we assume a simple detection:
                String symptoms = 'Example symptoms'; // Replace with actual input
                if (symptoms.contains('chest pain')) {
                  showDangerAlert(context);
                } else {
                  showNormalConsultation(context);
                }
              },
              child: const Text('Consult'),
            ),
          ],
        ),
      ),
    );
  }

  void showDangerAlert(BuildContext context) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Danger Alert'),
        content: const Text('Your symptoms indicate a potential emergency. Please seek immediate medical attention.'),
        actions: <Widget>[
          TextButton(
            child: const Text('OK'),
            onPressed: () => Navigator.of(context).pop(),
          ),
        ],
      ),
    );
  }

  void showNormalConsultation(BuildContext context) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Normal Consultation'),
        content: const Text('Your symptoms appear to be non-critical. Please consult a healthcare provider if symptoms persist.'),
        actions: <Widget>[
          TextButton(
            child: const Text('OK'),
            onPressed: () => Navigator.of(context).pop(),
          ),
        ],
      ),
    );
  }
}