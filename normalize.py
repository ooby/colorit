import sys
import cv2
src_img = cv2.imread(sys.argv[1])
src_img = cv2.cvtColor(src_img, cv2.COLOR_BGR2GRAY)
dst_img = cv2.normalize(src_img, src_img, 0, 255, cv2.NORM_MINMAX)
cv2.imwrite(sys.argv[1], dst_img)
