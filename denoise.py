import sys
import cv2
img = cv2.imread(sys.argv[1])
dst = cv2.fastNlMeansDenoising(img, None, 10, 1, 2)
cv2.imwrite(sys.argv[1], dst)
