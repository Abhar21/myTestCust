import re

with open('src/App.tsx', 'r') as f:
    lines = f.readlines()

# 1. Add showCheckoutPage state
state_index = -1
for i, line in enumerate(lines):
    if 'const [showSelectItemsModal, setShowSelectItemsModal] = useState(false);' in line:
        state_index = i
        break
if state_index != -1:
    lines.insert(state_index + 1, '  const [showCheckoutPage, setShowCheckoutPage] = useState(false);\n')

# 2. Update onClick for Confirm button
btn_index = -1
for i, line in enumerate(lines):
    if 'onClick={() => setModalStep(3)}' in line:
        btn_index = i
        break
if btn_index != -1:
    lines[btn_index] = '                    onClick={() => {\n                      setShowSelectItemsModal(false);\n                      setShowSelectItemsDrawer(false);\n                      setShowCheckoutPage(true);\n                    }}\n'

# 3. Remove modalStep === 3 block
start_idx = -1
end_idx = -1
for i, line in enumerate(lines):
    if '            ) : (() => {' in line and 'Step 3: Booking Preview' in ''.join(lines[i:i+40]):
        start_idx = i
        break

if start_idx != -1:
    # Find the closing })()} of this IIFE
    for i in range(start_idx, len(lines)):
        if '            })()}' in lines[i]:
            end_idx = i
            break

if start_idx != -1 and end_idx != -1:
    # Replace from start_idx to end_idx with `) : null}`
    lines = lines[:start_idx] + ['            ) : null}\n'] + lines[end_idx+1:]

with open('src/App.tsx', 'w') as f:
    f.writelines(lines)

print("Updates applied successfully.")
