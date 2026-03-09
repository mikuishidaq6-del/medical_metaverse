import 'package:flutter/material.dart';

class SymptomConsultationScreen extends StatefulWidget {
  const SymptomConsultationScreen({Key? key}) : super(key: key);

  @override
  State<SymptomConsultationScreen> createState() => _SymptomConsultationScreenState();
}

class _SymptomConsultationScreenState extends State<SymptomConsultationScreen> {
  final TextEditingController _symptomsController = TextEditingController();

  @override
  void dispose() {
    _symptomsController.dispose();
    super.dispose();
  }

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
            TextField(
              controller: _symptomsController,
              decoration: const InputDecoration(labelText: 'Enter your symptoms'),
              maxLines: 3,
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                // Logic for symptom analysis and danger detection goes here
                String symptoms = _symptomsController.text;
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