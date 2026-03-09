import 'package:flutter/material.dart';

class SymptomConsultationScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Symptom Consultation'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: <Widget>[
            TextField(
              decoration: InputDecoration(labelText: 'Enter your symptoms'),
              maxLines: 3,
            ),
            SizedBox(height: 20),
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
              child: Text('Consult'),
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
        title: Text('Danger Alert'),
        content: Text('Your symptoms indicate a potential emergency. Please seek immediate medical attention.'),
        actions: <Widget>[
          TextButton(
            child: Text('OK'),
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
        title: Text('Normal Consultation'),
        content: Text('Your symptoms appear to be non-critical. Please consult a healthcare provider if symptoms persist.'),
        actions: <Widget>[
          TextButton(
            child: Text('OK'),
            onPressed: () => Navigator.of(context).pop(),
          ),
        ],
      ),
    );
  }
}