import React, { useState } from 'react';
import { X, Upload, CheckCircle2, FileUp } from 'lucide-react';
import { Assignment } from '../../types/student';

interface SubmitAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  assignment: Assignment | null;
  onSubmitted: (assignmentId: string, submissionName: string) => void;
}

export const SubmitAssignmentModal: React.FC<SubmitAssignmentModalProps> = ({
  isOpen,
  onClose,
  assignment,
  onSubmitted,
}) => {
  const [fileName, setFileName] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !assignment) return null;

  const handleSimulatedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      onSubmitted(assignment.id, fileName || 'ps3_solutions_elena_vance.pdf');
      setTimeout(() => {
        setIsSuccess(false);
        setFileName('');
        setComment('');
        onClose();
      }, 1400);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-6 text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors p-1"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-lg bg-indigo-950/60 border border-indigo-800/60 text-indigo-400">
            <Upload className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white">Submit Academic Work</h3>
            <p className="text-xs text-slate-400 font-mono">{assignment.courseCode} · Due {assignment.dueDate}</p>
          </div>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center space-y-2">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
            <h4 className="text-base font-semibold text-white">Work Submitted Successfully!</h4>
            <p className="text-xs text-slate-300">
              Receipt recorded. Your instructor has been notified of the digital turn-in.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSimulatedSubmit} className="space-y-4">
            <div className="p-3 bg-slate-800/60 border border-slate-700/80 rounded-lg text-xs space-y-1">
              <p className="font-semibold text-white">{assignment.title}</p>
              <p className="text-slate-400">Maximum Grade Points: {assignment.maxPoints} pts</p>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Upload Solution File (.pdf, .zip, .ipynb, .py)
              </label>
              <div className="border-2 border-dashed border-slate-700 hover:border-indigo-500/80 rounded-xl p-6 text-center transition-colors cursor-pointer bg-slate-800/40">
                <FileUp className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-xs text-slate-300 font-medium">
                  {fileName ? fileName : 'Click to select submission file from device'}
                </p>
                <p className="text-[10px] text-slate-500 mt-1">Accepted: PDF, ZIP, TXT up to 50MB</p>
                <input
                  type="file"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setFileName(e.target.files[0].name);
                    }
                  }}
                  className="hidden"
                  id="file-upload-input"
                />
                <label
                  htmlFor="file-upload-input"
                  className="inline-block mt-3 px-3 py-1 text-xs rounded bg-slate-700 hover:bg-slate-600 text-white cursor-pointer"
                >
                  Browse Computer
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="student-notes-input" className="block text-xs font-medium text-slate-300 mb-1.5">
                Comments to Instructor (Optional)
              </label>
              <textarea
                id="student-notes-input"
                rows={2}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Notes regarding environment, dependencies, or proof structure..."
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 text-xs font-medium text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors flex items-center gap-1.5 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <span>Submit Assignment</span>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
